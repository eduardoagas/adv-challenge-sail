import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import Modal from '../Components/Modal';
import { Tarefa, PageProps } from '@/types';
import { Transition } from '@headlessui/react';

export default function Tarefas({ auth, tarefas, categorias }: PageProps<{ categorias: { id: number; nome: string }[], tarefas: Tarefa[] }>) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<Partial<Tarefa>>({
        titulo: '', // Provide an initial value
        criador_user_id: auth.user.id,
    });
    const [showModal, setShowModal] = useState(false);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();


        post(route('tarefas.salvar'), {
            onSuccess: () => {
                setShowModal(false); // Close modal after success
                setData({ titulo: '', criador_user_id: auth.user.id }); // Reset input field
            },
            onError: (errors) => {
                console.error("Failed to save the category:", errors); // Log errors to the console
                //setErrors(errors); // Update a local error state if you want to display it
            },
            onFinish: () => {
                console.log("Request finished"); // Optional: Add any cleanup actions
            },
        });
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
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-indigo-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    + Adicionar
                                </button>
                            </div>
                            <ul className="space-y-4">
                                {tarefas.map((tarefa) => (
                                    <li
                                        key={tarefa.id}
                                        className="border-b pb-2 text-gray-700 dark:text-gray-300"
                                    >
                                        {tarefa.titulo}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <form onSubmit={submit} className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                htmlFor="titulo"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Título
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={data.titulo}
                                onChange={(e) => setData('titulo', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Título para a nova tarefa"
                            />
                            {errors.titulo && <div className="text-red-600 text-sm">{errors.titulo}</div>}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="categoria_id"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Categoria
                            </label>
                            <select
                                id="categoria_id"
                                name="categoria_id"
                                value={data.categoria_id || ''}
                                onChange={(e) => setData('categoria_id', Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Selecione uma categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.categoria_id && <div className="text-red-600 text-sm">{errors.categoria_id}</div>}
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="descricao"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Descrição
                            </label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={data.descricao}
                                onChange={(e) => setData('descricao', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Descrição da tarefa"
                                rows={4}
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <PrimaryButton className='bg-indigo-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-400' disabled={processing}>Salvar</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}