import { useState, useEffect } from 'react';
import { Project } from './Project';
import ProjectList from './ProjectList';
import { projectAPI } from './projectAPI';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        projectAPI
            .get(currentPage)
            .then((data) => {
                setError(null);
                if (currentPage === 1) {
                    setProjects(data);
                }
                else {
                    setProjects((projects) => [...projects, ...data]);
                }
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage]);

    const handleMoreClick = () => {
        setCurrentPage((page) => page + 1);
    };

    const saveProject = (newProject: Project) => {
        projectAPI.put(newProject)
            .then((updatedProject: Project) => {
                const updatedProjects = projects.map((project) => {
                    if (project.id === newProject.id) {
                        return new Project(updatedProject);
                    }
                    return project;
                });
                setProjects(updatedProjects);
            }).catch((err: Error) => {
                setError(err.message);
            });
    };

    return (
        <>
            <h1>Projects</h1>
            {
                error && (
                    <div className='row'>
                        <div className='card large error'>
                            <section>
                                <p>
                                    <span className='icon-alert inverse'></span>
                                    {error}
                                </p>
                            </section>
                        </div>
                    </div>
                )
            }
            <ProjectList projects={projects} onSave={saveProject} />
            {
                !loading && !error && (
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='button-group fluid'>
                                <button className='button default' onClick={handleMoreClick}>More...</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                loading && (
                    <div className='center-page'>
                        <p>Loading...</p>
                        <span className='spinner primary'></span>
                    </div>
                )
            }
        </>
    );
}