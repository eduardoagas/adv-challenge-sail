import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Tarefa, PageProps } from '@/types';
import { useState } from 'react';

export default function criar({ auth }: PageProps<{}>) {
    const { data, setData, transform, post, errors, processing, recentlySuccessful } = useForm<Tarefa>();
    const [title, setTitle] = useState(""); //see if necessary
    const [description, setDescription] = useState("");
    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        //post(route('marmitas.salvar', { ...data, ...add }));

    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tarefas
                </h2>
            }
        >
            <Head title="Tarefas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Tarefas!
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Create a New Task</h1>
                <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter task title"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter task description"
                            rows={4}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
