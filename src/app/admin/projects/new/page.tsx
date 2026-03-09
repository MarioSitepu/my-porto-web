import { createProject } from "../actions";
import { ProjectForm } from "../components/project-form";

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Add New Project</h1>
            <ProjectForm action={createProject} />
        </div>
    );
}
