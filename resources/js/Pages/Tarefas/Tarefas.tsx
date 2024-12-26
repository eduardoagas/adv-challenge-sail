import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import Modal from '../Components/Modal';
import { Tarefa, PageProps } from '@/types';
import { Transition } from '@headlessui/react';

export default function Tarefas({ auth, tarefas, categorias }: PageProps<{ categorias: { id: number; nome: string }[], tarefas: Tarefa[] }>) {
    const { delete: destroy, data, put, setData, post, processing, errors, recentlySuccessful } = useForm<Partial<Tarefa>>({
        titulo: '', // Provide an initial value
        criador_user_id: auth.user.id,
    });
    const [filteredTarefas, setFilteredTarefas] = useState<Tarefa[]>(tarefas);
    const [selectedTarefa, setSelectedTarefa] = useState<Tarefa | null>(null);
    const [showTarefaModal, setShowTarefaModal] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });

    const handleSort = (key: keyof Tarefa) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
        setFilteredTarefas(prevState => {
            const sortedTarefas = [...prevState];
            sortedTarefas.sort((a, b) => {
                if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
                return 0;
            });
            return sortedTarefas;
        });
    };

    const filterByCategory = (categoriaId: number) => {
        setFilteredTarefas(prevState => {
            const sortedTarefas = [...prevState];

            sortedTarefas.sort((a, b) => {
                if (a.categoria_id === categoriaId && b.categoria_id !== categoriaId) return -1;
                if (a.categoria_id !== categoriaId && b.categoria_id === categoriaId) return 1;
                return a.categoria_id - b.categoria_id;
            });

            return sortedTarefas;
        });
    };

    const markAsConcluded = (tarefa: Tarefa) => {
        router.put(route('tarefas.concluir', tarefa.id), {}, {
            onSuccess: () => {
                const updatedTarefas = tarefas.map((t) =>
                    t.id === tarefa.id ? { ...t, concluida: true } : t
                );
                setFilteredTarefas(updatedTarefas);
            },
        });
    };
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (isEditing && selectedTarefa) {
            put(route('tarefas.atualizar', selectedTarefa.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setIsEditing(false);
                    location.reload(); // Reload to reflect changes
                },
                onError: (errors) => console.error("Failed to edit the task:", errors),
            });
        } else {
            post(route('tarefas.salvar'), {
                onSuccess: () => {
                    setShowModal(false); // Close modal after success
                    setData({ titulo: '', criador_user_id: auth.user.id }); // Reset input field
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
                    Tarefas
                </h2>
            }
        >
            <Head title="Tarefas" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
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
                            <table className="border-separate min-w-full table-auto ">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th
                                            className="w-[10%] px-4 py-2 cursor-pointer resize-y"
                                            onClick={() => handleSort('concluida')}
                                        >
                                            Concluída
                                        </th>
                                        <th
                                            className="w-[70%] px-4 py-2 cursor-pointer"
                                            onClick={() => handleSort('titulo')}
                                        >
                                            Título
                                        </th>
                                        <th
                                            className="w-[20%] px-4 py-2 cursor-pointer"
                                            onClick={() => handleSort('categoria_id')}
                                        >
                                            Categoria
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTarefas.map((tarefa) => (
                                        <tr
                                            key={tarefa.id}
                                            className="border-b dark:border-gray-600"
                                            onClick={() => {
                                                setSelectedTarefa(tarefa);
                                                setShowTarefaModal(true);
                                            }}
                                        >
                                            <td className="px-4 py-2 text-center">
                                                {tarefa.concluida ? (
                                                    <span className=" text-green-500">✔️</span>
                                                ) : (
                                                    <span className="text-gray-500">Não</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">{tarefa.titulo}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className="text-blue-500 underline cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        filterByCategory(tarefa.categoria_id!);
                                                    }}
                                                >
                                                    {categorias.find((c) => c.id === tarefa.categoria_id)?.nome || 'Sem Categoria'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showTarefaModal && selectedTarefa && (
                <Modal closeModal={() => setShowTarefaModal(false)}>
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 px-8 pt-6 pb-8 mb-4 relative">
                        <button
                            onClick={() => setShowTarefaModal(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✖️
                        </button>
                        <h2 className="text-xl font-bold">{selectedTarefa.titulo}</h2>
                        <p className="my-4">{selectedTarefa.descricao}</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-indigo-200 text-white px-4 py-2 rounded hover:bg-indigo-400"
                                onClick={() => destroy(route('tarefas.excluir', selectedTarefa.id), {
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
                                    setShowTarefaModal(false);
                                    setData({
                                        titulo: selectedTarefa?.titulo || '',
                                        descricao: selectedTarefa?.descricao || '',
                                        categoria_id: selectedTarefa?.categoria_id,
                                        criador_user_id: selectedTarefa?.criador_user_id,
                                    });
                                    setShowModal(true); // Open the add/edit modal with pre-filled data
                                }}
                            >
                                ✏️ Editar
                            </button>
                            {!selectedTarefa.concluida && (
                                <button
                                    className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={() => markAsConcluded(selectedTarefa)}
                                >
                                    Marcar como concluída
                                </button>
                            )}
                        </div>
                    </div>
                </Modal>
            )}

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <form onSubmit={submit} className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
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
                                placeholder="Título da tarefa"
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
