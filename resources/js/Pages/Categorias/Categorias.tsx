import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import Modal from '../Components/Modal';
import { Categoria, PageProps } from '@/types';
import { Transition } from '@headlessui/react';

export default function Categorias({ auth, categorias }: PageProps<{ categorias: Categoria[] }>) {
    const { delete: destroy, data, put, setData, post, processing, errors, recentlySuccessful } = useForm<Partial<Categoria>>({
        nome: '', // Provide an initial value
        criador_user_id: auth.user.id,
    });
    const [filteredCategorias, setFilteredCategorias] = useState<Categoria[]>(categorias);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });

    const handleSort = (key: keyof Categoria) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };


    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (isEditing && selectedCategoria) {
            put(route('categorias.atualizar', selectedCategoria.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setIsEditing(false);
                    location.reload(); // Reload to reflect changes
                },
                onError: (errors) => console.error("Failed to edit the task:", errors),
            });
        } else {
            post(route('categorias.salvar'), {
                onSuccess: () => {
                    setShowModal(false); // Close modal after success
                    setData({ nome: '', criador_user_id: auth.user.id }); // Reset input field
                    location.reload();
                },
                onError: (errors) => {
                    console.error("Failed to save the category:", errors); // Log errors to the console
                    //setErrors(errors); // Update a local error state if you want to display it
                },
                onFinish: () => {
                    console.log("Request finished"); // Optional: Add any cleanup actions
                },
            });
        }
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
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
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
                            <table className="border-separate min-w-full table-auto ">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">

                                        {/*<th
                                            className="w-[70%] px-4 py-2 cursor-pointer"
                                            onClick={() => handleSort('nome')}
                                        >
                                            Nome
                                        </th>*/}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategorias.map((categoria) => (
                                        <tr
                                            key={categoria.id}
                                            className="border-b dark:border-gray-600"
                                            onClick={() => {
                                                setSelectedCategoria(categoria);
                                                setShowCategoriaModal(true);
                                            }}
                                        >

                                            <td className="px-4 py-2">{categoria.nome}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showCategoriaModal && selectedCategoria && (
                <Modal closeModal={() => setShowCategoriaModal(false)}>
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 px-8 pt-6 pb-8 mb-4 relative">
                        <button
                            onClick={() => setShowCategoriaModal(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✖️
                        </button>
                        <h2 className="text-xl font-bold">{selectedCategoria.nome}</h2>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-indigo-200 text-white px-4 py-2 rounded hover:bg-indigo-400"
                                onClick={() => destroy(route('categorias.excluir', selectedCategoria.id), {
                                    onSuccess: () => {
                                        setShowModal(false); // Close modal after success
                                        location.reload();
                                    },
                                    onError: (errors) => {
                                        console.error("Failed to delete the task:", errors); // Log errors to the console
                                        //setErrors(errors); // Update a local error state if you want to display it
                                    },
                                    onFinish: () => {
                                        console.log("Request finished"); // Optional: Add any cleanup actions
                                    },
                                })}
                            >
                                🗑 Excluir
                            </button>
                            <button
                                className="bg-indigo-200 text-white px-4 py-2 rounded hover:bg-indigo-400"
                                onClick={() => {
                                    setIsEditing(true);
                                    setShowCategoriaModal(false);
                                    setData({
                                        nome: selectedCategoria?.nome || '',
                                        criador_user_id: selectedCategoria?.criador_user_id,
                                    });
                                    setShowModal(true); // Open the add/edit modal with pre-filled data
                                }}
                            >
                                ✏️ Editar
                            </button>

                        </div>
                    </div>
                </Modal>
            )}

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <form onSubmit={submit} className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h2>
                        <div className="mb-4">
                            <label
                                htmlFor="nome"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={data.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nome da categoria"
                            />
                            {errors.nome && <div className="text-red-600 text-sm">{errors.nome}</div>}
                        </div>



                        {/*<div className="mb-6">
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
                                placeholder="Descrição da categoria"
                                rows={4}
                            />
                        </div>*/}

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    setIsEditing(false);
                                }}
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
