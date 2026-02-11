import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    stickerUploader: f({
        image: { maxFileSize: "32MB" },
        pdf: { maxFileSize: "64MB" },
        blob: { maxFileSize: "64MB" } // For AI, PSD, etc.
    })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata);
            console.log("file url", file.url);
            return { uploadedBy: "Pigmento" };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
