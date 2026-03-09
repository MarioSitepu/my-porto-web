"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
    initialData?: {
        id: string;
        title: string;
        titleEn: string;
        description: string;
        descriptionEn: string;
        image: string;
        technologies: string[];
        github: string;
        demo: string;
    };
    action: (formData: FormData) => Promise<void>;
}

export function ProjectForm({ initialData, action }: ProjectFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialData?.image || "");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);

        try {
            // Client-side Resize & Crop (Target: Max ~3MB, Aspect Ratio: 16:9)
            // Ini akan memastikan gambar selalu rapi masuk ke frame website (16:9)
            const processedFile = await new Promise<Blob>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const width = img.width;
                    const height = img.height;

                    // Target 16:9 Aspect Ratio
                    const targetRatio = 16 / 9;
                    const imgRatio = width / height;

                    let cropX = 0;
                    let cropY = 0;
                    let cropWidth = width;
                    let cropHeight = height;

                    if (imgRatio > targetRatio) {
                        // Image is wider than 16:9, crop width
                        cropWidth = height * targetRatio;
                        cropX = (width - cropWidth) / 2;
                    } else if (imgRatio < targetRatio) {
                        // Image is taller than 16:9, crop height
                        cropHeight = width / targetRatio;
                        cropY = (height - cropHeight) / 2;
                    }

                    // Max width/height to keep size under ~3MB (roughly 2560x1440 max)
                    const MAX_WIDTH = 2560;
                    const MAX_HEIGHT = 1440;

                    if (cropWidth > MAX_WIDTH) {
                        const scale = MAX_WIDTH / cropWidth;
                        cropWidth = MAX_WIDTH;
                        cropHeight = cropHeight * scale;
                    }
                    if (cropHeight > MAX_HEIGHT) {
                        const scale = MAX_HEIGHT / cropHeight;
                        cropHeight = MAX_HEIGHT;
                        cropWidth = cropWidth * scale;
                    }

                    canvas.width = cropWidth;
                    canvas.height = cropHeight;

                    const ctx = canvas.getContext("2d");
                    if (!ctx) {
                        reject(new Error("Canvas context not getting initialized"));
                        return;
                    }

                    ctx.drawImage(
                        img,
                        cropX, cropY, cropWidth, cropHeight, // Source crop
                        0, 0, cropWidth, cropHeight // Destination
                    );

                    // Output as JPEG with 0.85 quality to ensure it stays well under 3MB
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Canvas to Blob failed"));
                        }
                    }, "image/jpeg", 0.85);
                };
                img.onerror = () => reject(new Error("Image load failed"));
                img.src = URL.createObjectURL(file);
            });

            const formData = new FormData();
            formData.append("file", processedFile, "project-thumbnail.jpg");
            formData.append("upload_preset", "my_porto");

            const res = await fetch("https://api.cloudinary.com/v1_1/dbkzi1oao/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.secure_url) {
                setImageUrl(data.secure_url);
            } else {
                console.error("Cloudinary Error:", data);
                throw new Error("Cloudinary upload failed");
            }
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Gagal memproses dan mengunggah gambar.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            await action(formData);
        });
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-8 border border-border/50 rounded-2xl shadow-sm">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Title (ID)</label>
                        <input
                            name="title"
                            defaultValue={initialData?.title}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="Judul Proyek..."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Title (EN)</label>
                        <input
                            name="titleEn"
                            defaultValue={initialData?.titleEn}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="Project Title..."
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description (ID)</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none min-h-[120px]"
                            placeholder="Deskripsi bahasa Indonesia..."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description (EN)</label>
                        <textarea
                            name="descriptionEn"
                            defaultValue={initialData?.descriptionEn}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none min-h-[120px]"
                            placeholder="English description..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4 p-4 border border-border/50 rounded-xl bg-muted/20">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Upload Project Image (Cloudinary)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer disabled:opacity-50"
                        />
                        {uploadingImage && (
                            <p className="text-xs text-primary mt-2 font-medium animate-pulse">
                                Mengunggah ke Cloudinary...
                            </p>
                        )}
                        {!uploadingImage && (
                            <p className="text-xs text-muted-foreground mt-2">Gambar akan otomatis terisi ke URL di bawah.</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-border"></div>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">URL</span>
                        <div className="flex-1 h-px bg-border"></div>
                    </div>

                    <div className="space-y-2">
                        <input
                            name="image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="https://res.cloudinary.com/..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Technologies (comma separated)</label>
                    <input
                        name="technologies"
                        defaultValue={initialData?.technologies.join(", ")}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                        placeholder="React, Next.js, Prisma"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub Link</label>
                        <input
                            name="github"
                            defaultValue={initialData?.github}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="#"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Demo Link</label>
                        <input
                            name="demo"
                            defaultValue={initialData?.demo}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="#"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isPending || uploadingImage}
                    className="flex-1 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {isPending ? "Saving..." : initialData ? "Update Project" : "Create Project"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-muted text-muted-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
