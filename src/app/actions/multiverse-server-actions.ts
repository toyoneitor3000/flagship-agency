'use server';

const IS_DEV = process.env.NODE_ENV === 'development';

const PROJECTS_CONFIG: Record<string, { path: string; port: number; command: string }> = {
    'p-2': { // Pigmento Stickers
        path: 'src/multiverse/pigmentostkts-web/PURRPURR/purrpurragent/workspace/pigmentostkts-web',
        port: 3001,
        command: 'npm run dev -- --turbo' // Pasamos --turbo al script subyacente
    },
    'p-3': { // Victory Cars
        path: 'src/multiverse/victory-cars-detailing',
        port: 3003,
        command: 'npm run dev -- --turbo'
    },
    'p-4': { // Speedlight Culture
        path: 'src/multiverse/speedlight_culture',
        port: 3000,
        command: 'npm run dev -- --turbo'
    },
    'p-5': { // Financars
        path: 'src/multiverse/financars',
        port: 3005,
        command: 'npm run dev -- --turbo'
    }
};

/**
 * Checks if a port is currently in use (server is likely running)
 */
export async function checkServerStatus(projectId: string): Promise<boolean> {
    // In production, these local servers don't exist in the container context
    if (!IS_DEV) return false;

    const config = PROJECTS_CONFIG[projectId];
    if (!config) return false;

    try {
        const net = (await import('net')).default || await import('net');

        return new Promise((resolve) => {
            const client = new net.Socket();

            client.setTimeout(1000); // 1s timeout

            client.on('connect', () => {
                client.destroy();
                resolve(true); // Port is open, server is running
            });

            client.on('timeout', () => {
                client.destroy();
                resolve(false);
            });

            client.on('error', () => {
                client.destroy();
                resolve(false); // Connection refused, server is down
            });

            client.connect(config.port, 'localhost');
        });
    } catch (e) {
        return false;
    }
}

/**
 * Starts the development server for a project
 */
export async function startProjectServer(projectId: string) {
    if (!IS_DEV) {
        return { success: false, error: 'Server orchestration is disabled in production environment.' };
    }

    const config = PROJECTS_CONFIG[projectId];
    if (!config) return { success: false, error: 'Project configuration not found.' };

    const isRunning = await checkServerStatus(projectId);
    if (isRunning) return { success: true, message: 'Server is already running.' };

    try {
        // Dynamic imports to prevent bundling in production
        const { spawn } = await import('child_process');
        const path = (await import('path')).default || await import('path');
        const fs = (await import('fs')).default || await import('fs');
        const dotenv = (await import('dotenv')).default || await import('dotenv');

        const absolutePath = path.join(process.cwd(), config.path);
        console.log(`🚀 Starting server for ${projectId} in ${absolutePath}`);

        // Load project-specific environment variables
        const envFiles = ['.env', '.env.local'];
        let localEnv: Record<string, string> = {};

        try {
            for (const file of envFiles) {
                const envPath = path.join(absolutePath, file);
                if (fs.existsSync(envPath)) {
                    const envContent = fs.readFileSync(envPath, 'utf8');
                    const parsed = dotenv.parse(envContent);
                    localEnv = { ...localEnv, ...parsed };
                    console.log(`✅ Loaded ${file} for ${projectId}`);
                }
            }
        } catch (e) {
            console.warn(`Could not preload environment for ${projectId}:`, e);
        }

        return new Promise((resolve) => {
            let logs = '';

            // Explicitly include PATH to ensure npm/node are found
            const child = spawn(config.command.split(' ')[0], config.command.split(' ').slice(1), {
                cwd: absolutePath,
                shell: true,
                detached: true,
                stdio: ['ignore', 'pipe', 'pipe'],
                env: {
                    ...process.env,
                    ...localEnv,
                    PORT: config.port.toString(),
                    NODE_ENV: 'development',
                    PATH: process.env.PATH // Critical for finding binaries
                }
            });

            child.stdout?.on('data', (data) => {
                const chunk = data.toString();
                logs += chunk;
                if (logs.length > 5000) logs = logs.slice(-5000); // Keep last 5KB
                console.log(`[${projectId} STDOUT]: ${chunk.trim()}`);
            });

            child.stderr?.on('data', (data) => {
                const chunk = data.toString();
                logs += chunk;
                if (logs.length > 5000) logs = logs.slice(-5000);
                console.error(`[${projectId} STDERR]: ${chunk.trim()}`);
            });

            child.on('error', (err) => {
                console.error(`[${projectId} SPAWN ERROR]:`, err);
                resolve({ success: false, error: `Spawn error: ${err.message}`, logs });
            });

            // If it doesn't exit in 7 seconds, assume it's running (Next.js takes time)
            const timeout = setTimeout(() => {
                child.unref(); // Allow the parent to exit independently
                resolve({
                    success: true,
                    message: `Command issued. Monitoring port ${config.port}...`,
                    logs: logs.slice(-2000)
                });
            }, 7000);

            child.on('exit', (code) => {
                clearTimeout(timeout);
                if (code !== 0 && code !== null) {
                    console.error(`[${projectId} EXIT]: Process exited with code ${code}`);
                    resolve({
                        success: false,
                        error: `Process failed to start (exit code ${code})`,
                        logs: logs.slice(-2000) || 'No logs captured.'
                    });
                }
            });
        });
    } catch (error: any) {
        console.error('Error in startProjectServer:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Stops any process running on the project's port
 */
export async function stopProjectServer(projectId: string) {
    if (!IS_DEV) return { success: false, error: 'Disabled in production' };

    const config = PROJECTS_CONFIG[projectId];
    if (!config) return { success: false, error: 'Project configuration not found.' };

    try {
        const { exec } = await import('child_process');
        const promisify = (await import('util')).promisify;
        const execAsync = promisify(exec);

        // Find PID by port - using a more robust approach
        console.log(`🔍 Searching for process on port ${config.port}...`);
        const { stdout } = await execAsync(`lsof -t -i :${config.port}`);
        const pids = stdout.trim().split('\n').filter(p => /^\d+$/.test(p.trim()));

        if (pids.length === 0) {
            console.log(`ℹ️ No process active on port ${config.port}`);
            return { success: true, message: 'Server is already stopped.' };
        }

        console.log(`🛑 Stopping processes for ${projectId} (PIDs: ${pids.join(', ')})`);

        for (const pid of pids) {
            try {
                // Try SIGTERM first, then SIGKILL if needed
                await execAsync(`kill ${pid}`);
                // Short wait to see if it died
                await new Promise(r => setTimeout(r, 500));
                await execAsync(`kill -0 ${pid}`).catch(() => { /* process is dead, good */ });
            } catch (e) {
                // If still alive, force kill
                await execAsync(`kill -9 ${pid}`).catch(() => { });
            }
        }

        return { success: true, message: `Stopped processes on port ${config.port}` };
    } catch (error: any) {
        console.log(`ℹ️ Stop command note: ${error.message}`);
        return { success: true, message: 'Server is likely already stopped.' };
    }
}
