import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Tarefa, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function criar({ auth, categorias }: PageProps<{ categorias: { id: number; nome: string }[] }>) {
    const { data, post, processing, recentlySuccessful } = useForm<Tarefa>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Estado para a categoria selecionada
    const [v_errors, setErrors] = useState<any>({});

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const validation = validateFormData();
        if (validation.hasErrors) {
            setErrors(validation.errors);
            return;
        }
        const add: Tarefa = {
            titulo: title,
            descricao: description,
            categoria_id: selectedCategory!,
            criador_user_id: auth.user.id,
        };
        post(route('tarefas.salvar', { ...data, ...add }));
    };

    const validateFormData = () => {
        let hasErrors = false;
        const newErrors: any = {};

        if (!title) {
            hasErrors = true;
            newErrors.label = 'A tarefa deve possuir um título!';
        }
        if (!selectedCategory) {
            hasErrors = true;
            newErrors.category = 'Você deve selecionar uma categoria!';
        }

        return { hasErrors, errors: newErrors };
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
                            htmlFor="title"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Título
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Título para a nova tarefa"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="categoria"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Categoria
                        </label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={selectedCategory || ''}
                            onChange={(e) => setSelectedCategory(Number(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descrição da tarefa"
                            rows={4}
                        />
                    </div>



                    <div className="flex-col pb-24">
                        <div className="flex items-center justify-center">
                            <PrimaryButton disabled={processing}>Salvar</PrimaryButton>
                        </div>
                        {v_errors.label && (
                            <div className="mt-4 text-red-600 text-sm opacity-95 border border-red-300 rounded px-2 py-1 bg-red-50">
                                <div style={{ color: 'red' }}>{v_errors.label}</div>
                            </div>
                        )}
                        {v_errors.category && (
                            <div className="mt-1 text-red-600 text-sm opacity-95 border border-red-300 rounded px-2 py-1 bg-red-50">
                                <div style={{ color: 'red' }}>{v_errors.category}</div>
                            </div>
                        )}
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
