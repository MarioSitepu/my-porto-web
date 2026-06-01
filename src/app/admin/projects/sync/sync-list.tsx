"use client";

import { useState } from "react";
import { syncProjectToDB, removeProjectFromDB } from "./actions";

interface Repo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    language: string;
    html_url: string;
    homepage: string;
}

interface SyncListProps {
    repos: Repo[];
    syncedIds: number[];
}

export default function SyncList({ repos, syncedIds }: SyncListProps) {
    const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

    const handleToggle = async (repo: Repo, isCurrentlySynced: boolean) => {
        setLoadingIds((prev) => new Set(prev).add(repo.id));

        try {
            if (isCurrentlySynced) {
                await removeProjectFromDB(repo.id);
            } else {
                await syncProjectToDB(repo.full_name, repo.id, repo);
            }
        } catch (error) {
            console.error("Failed to sync project", error);
            alert("Failed to sync project. Please check the console.");
        } finally {
            setLoadingIds((prev) => {
                const next = new Set(prev);
                next.delete(repo.id);
                return next;
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => {
                const isSynced = syncedIds.includes(repo.id);
                const isLoading = loadingIds.has(repo.id);

                return (
                    <div
                        key={repo.id}
                        className="flex flex-col p-4 bg-card border border-border/50 rounded-xl shadow-sm hover:border-primary/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{repo.name}</h3>
                            <button
                                onClick={() => handleToggle(repo, isSynced)}
                                disabled={isLoading}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    isSynced ? "bg-primary" : "bg-muted"
                                }`}
                            >
                                <span className="sr-only">Tampilkan di Porto</span>
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        isSynced ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground flex-1 mb-4 line-clamp-2">
                            {repo.description || "No description provided."}
                        </p>
                        <div className="flex items-center justify-between text-xs font-medium">
                            <div className="flex items-center gap-2">
                                {repo.language && (
                                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                                        {repo.language}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center h-4">
                                {isLoading && (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                )}
                                {!isLoading && isSynced && (
                                    <span className="text-green-500">Synced</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {repos.length === 0 && (
                <div className="col-span-full p-8 text-center text-muted-foreground">
                    No repositories found or token not configured.
                </div>
            )}
        </div>
    );
}
