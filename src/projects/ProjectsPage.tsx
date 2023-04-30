import { MOCK_PROJECTS } from "./MockProject";

function ProjectsPage() {
    return (
        <>
            <h1>Projects</h1>
            <pre>{JSON.stringify(MOCK_PROJECTS, null, 2)}</pre>
        </>
    );
}

export default ProjectsPage;