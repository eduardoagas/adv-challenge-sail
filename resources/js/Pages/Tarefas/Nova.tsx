import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Tarefa, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function Criar({ auth, categorias }: PageProps<{ categorias: { id: number; nome: string }[] }>) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<Tarefa>({
        titulo: '',
        descricao: '',
        categoria_id: null,
        criador_user_id: auth.user.id,
    });

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post(route('tarefas.salvar'), {
            data: { data },
            onSuccess: () => { },
            onError: () => {
                // console.log
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

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Criar Nova Tarefa</h1>
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

                    <div className="flex-col pb-24">
                        <div className="flex items-center justify-center">
                            <PrimaryButton disabled={processing}>Salvar</PrimaryButton>
                        </div>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Salvo com sucesso!</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
