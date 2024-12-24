import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import Modal from '../Components/Modal';
import { Categoria, PageProps } from '@/types';

export default function Categorias({ auth, categorias }: PageProps<{ categorias: Categoria[] }>) {
    const { data, setData, post, processing } = useForm<Partial<Categoria>>({
        nome: '', // Provide an initial value
        criador_user_id: auth.user.id,
    });
    const [showModal, setShowModal] = useState(false);

    const handleAddCategory = (e: { preventDefault: () => void }) => {
        e.preventDefault();


        post(route('categorias.salvar'), {
            onSuccess: () => {
                setShowModal(false); // Close modal after success
                setData({ nome: '', criador_user_id: auth.user.id }); // Reset input field
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
                    Categorias
                </h2>
            }
        >
            <Head title="Categorias" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">Lista de Categorias</h1>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-indigo-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    + Adicionar
                                </button>
                            </div>
                            <ul className="space-y-4">
                                {categorias.map((categoria) => (
                                    <li
                                        key={categoria.id}
                                        className="border-b pb-2 text-gray-700 dark:text-gray-300"
                                    >
                                        {categoria.nome}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <form
                        onSubmit={handleAddCategory}
                        className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6"
                    >
                        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
                            Adicionar Nova Categoria
                        </h2>
                        <div className="mb-4">
                            <label
                                htmlFor="nome"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Nome da Categoria
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={data.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Digite o nome da categoria"
                                required
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
                            <PrimaryButton disabled={processing}>Salvar</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
