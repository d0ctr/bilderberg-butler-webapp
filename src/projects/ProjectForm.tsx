import { SyntheticEvent, useState } from 'react';
import { Project } from './Project';

export interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void;
}

export default function ProjectForm({ project: initialProject, onSave, onCancel }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    });

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) {
            return;
        }
        onSave(project);
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;

        let newValue: number | boolean | string;

        switch(type) {
            case 'number':
                newValue = Number(value);
                break;
            case 'checkbox':
                newValue = checked === true;
                break;
            default:
                newValue = value;
                break;
        }

        let updatedProject: Project;

        setProject((previousProjectValues) => {
            updatedProject = new Project({
                ...previousProjectValues,
                [name]: newValue
            });
            return updatedProject;
        });

        setErrors(() => validate(updatedProject));
    };

    const validate = ({ name, description, budget }: Project) => {
        const errors = {
            name: '',
            description: '',
            budget: ''
        };

        if (name.length === 0) {
            errors.name = 'Name is required';
        }
        if (name.length < 3) {
            errors.name = 'Name must have at least 3 characters';
        }
        if (description.length === 0) {
            errors.description = 'Description is required';
        }
        if (budget === 0) {
            errors.budget = 'Budget must be greater than 0';
        }

        return errors;
    };

    const isValid = () => {
        return Object.values(errors).find((value) => value !== '') === undefined;
    };

    return (
        <form className='input-group vertical' onSubmit={handleSubmit}>
            <label htmlFor='name'>Project Name</label>
            <input type='text' name='name' placeholder='enter name' value={project.name} onChange={handleChange}/>
            {errors.name !== '' && (
                <div className='card error'>
                    <p>{errors.name}</p>
                </div>
            )}
            
            <label htmlFor='description'>Project Description</label>
            <textarea name='description' placeholder='enter description' value={project.description} onChange={handleChange}/>
            {errors.description !== '' && (
                <div className='card error'>
                    <p>{errors.description}</p>
                </div>
            )}

            <label htmlFor='budget'>Project Budget</label>
            <input type='number' name='budget' placeholder='enter budget' value={project.budget} onChange={handleChange}/>
            {errors.budget !== '' && (
                <div className='card error'>
                    <p>{errors.budget}</p>
                </div>
            )}

            <label htmlFor='isActive'>Active?</label>
            <input type='checkbox' name='isActive' checked={project.isActive} onChange={handleChange}/>

            <div className='input-group'>
                <button className='primary bordered medium'>Save</button>
                <span></span>
                <button type='button' className='bordered medium' onClick={onCancel} onChange={handleChange}>cancel</button>
            </div>
        </form>
    );
}