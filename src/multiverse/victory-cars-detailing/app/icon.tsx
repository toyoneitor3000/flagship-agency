import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 512,
    height: 512,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 320,
                    background: '#020617', // brand-dark-blue
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06b6d4', // brand-cyan
                    borderRadius: '20%', // Soft square/squircle
                    border: '20px solid #06b6d4',
                    fontWeight: 900,
                    fontFamily: 'sans-serif',
                }}
            >
                V
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
