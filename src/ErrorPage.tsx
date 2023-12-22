// ErrorPage.tsx
type ErrorPageProps = {
    errorCode: number;
};

export function ErrorPage({ errorCode }: ErrorPageProps) {
    let errorMessage;

    switch (errorCode) {
        case 404:
            errorMessage = 'Page not found';
            break;
        case 500:
            errorMessage = 'Internal server error';
            break;
        default:
            errorMessage = 'An unknown error occurred';
    }

    return (
        <div>
            <h1>Error: {errorCode}</h1>
            <p>{errorMessage}</p>
        </div>
    );
}