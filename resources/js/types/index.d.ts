import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Tarefa{
    id: number;
    titulo: string;
    descricao?: string;
    categoria_id: integer;
    criador_user_id: integer;
}

interface Categoria {
    id: number;
    criador_user_id: integer;
    nome: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
