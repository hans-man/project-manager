declare const _default: () => {
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
    };
};
export default _default;
