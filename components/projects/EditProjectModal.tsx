"use client";

import { useState } from "react";
import { X, Pencil } from "lucide-react";
import { Project } from "@/lib/types/types";

interface EditProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onUpdateProject: (
    projectId: string,
    name: string,
    description: string
  ) => Promise<void>;
  isLoading: boolean;
}

export function EditProjectModal({
  project,
  onClose,
  onUpdateProject,
  isLoading,
}: EditProjectModalProps) {
  // Initial values come from the project; the parent remounts this modal (via `key`) per project
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");

  if (!project) return null;

  const hasChanges =
    name.trim() !== project.name ||
    description.trim() !== (project.description ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && hasChanges) {
      try {
        await onUpdateProject(project.id, name.trim(), description.trim());
      } catch (err) {
        console.error("Failed to update project:", err);
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-200 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 rounded-xl flex items-center justify-center">
              <Pencil size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">Edit project</h2>
              <p className="text-sm text-gray-400">
                Update the project name or description
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-300 transition-colors p-2 hover:bg-gray-800 rounded-lg disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label
              htmlFor="edit-name"
              className="block text-sm font-medium text-gray-300 mb-3"
            >
              Project name
            </label>
            <input
              type="text"
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 disabled:opacity-50 text-white placeholder-gray-500 transition-all duration-200"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="edit-description"
              className="block text-sm font-medium text-gray-300 mb-3"
            >
              Description
              <span className="text-gray-500 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will this project be about?"
              rows={3}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 disabled:opacity-50 text-white placeholder-gray-500 resize-none transition-all duration-200"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-gray-300 bg-gray-800/50 hover:bg-gray-800 disabled:bg-gray-800/30 disabled:text-gray-500 border border-gray-700 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim() || !hasChanges || isLoading}
              className="flex-1 px-4 py-3 bg-white hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400 text-black rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
