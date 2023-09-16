import { useEffect, useState } from 'react';

const useDocumentTitle = (title) => {
    const [documentTitle, setDoucmentTitle] = useState(title);
    
    useEffect(() => {
        document.title = documentTitle + " | envoii technologies";
    }, [documentTitle]);

    return [documentTitle, setDoucmentTitle];
};

export { useDocumentTitle };
