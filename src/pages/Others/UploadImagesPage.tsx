import { useState, useEffect, useRef } from 'react';
import Loading from '../../components/Loading/Loading';
import ErrorDisplay from '../../components/Error/ErrorComponent';
import SuccessDisplay from '../../components/Success/SuccessComponent';
import UploadService from '../../services/UploadService';

export default function UploadImagesPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [imagesURL, setImagesURL] = useState<string[] | null>([]);
    const [successMessage, setSuccessMessage] = useState('');

    const dropAreaRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const dropArea = dropAreaRef.current;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = () => {
            setIsDragging(false);
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer?.files) {
                setSelectedFile(e.dataTransfer.files[0]);
            }
        };

        dropArea?.addEventListener('dragover', handleDragOver);
        dropArea?.addEventListener('dragleave', handleDragLeave);
        dropArea?.addEventListener('drop', handleDrop);

        return () => {
            dropArea?.removeEventListener('dragover', handleDragOver);
            dropArea?.removeEventListener('dragleave', handleDragLeave);
            dropArea?.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!selectedFile) {
            setErrorMessage('Please select a file to upload');
            return;
        }


        setLoading(true);
        try {
            const response = await UploadService.uploadImage(selectedFile);

            if (response.url) {

                let urls = imagesURL || [];
                urls.push(response.url);
                setImagesURL(urls);
                setSuccessMessage(response.message);
                setSelectedFile(null);
            } else {
                setErrorMessage(response.message);
            }
            setLoading(false);
        } catch (error: any) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className='w-full h-full p-8 mx-auto mt-8 shadow-lg max-w-5xl bg-white rounded overflow-auto'>

            <div className='flex flex-row justify-between items-center'>
                <p className='link-internal'><a href='/' className=''>Home</a> / <a href="">Products</a> / Uploads</p>
            </div>

            <h1 className='primary-title'>Upload Images</h1>

            <div className='my-4'>
                {errorMessage && <ErrorDisplay message={errorMessage} />}
                {successMessage && <SuccessDisplay message={successMessage} />}
            </div>

            <div
                ref={dropAreaRef}
                className={`drag-drop-area h-44 ${isDragging ? 'dragging' : ''}`}
                onClick={handleClick}
            >


                {loading ?
                    <Loading /> : (

                        <>
                            <p className='select-none text-gray-400'>Drag & drop or select your image here</p>
                            <p className='select-none text-gray-400'>Supported formats: jpg, png, webp</p>
                            <p className='select-none text-gray-400'>Max size: 5MB</p>
                            <p className='select-none text-gray-400'>File name: <span className='font-semibold'>{selectedFile?.name}</span></p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                hidden
                            />
                        </>
                    )}

            </div>


            <div className='flex flex-row justify-center align-middle'>

                <button onClick={handleUpload} disabled={loading} className="submit-button mt-4 w-3/4 md:w-1/4">
                    Upload
                </button>
            </div>

            {imagesURL?.length !== 0 && <div className='my-4'>
                <p className='secondary-title text-gray-500'>Uploaded images</p>

                {imagesURL?.map((url, index) => (
                    <div>
                        <button className=" text-sm cursor-pointer text-secondary " key={index}
                            onClick={() => navigator.clipboard.writeText(url)
                                .then(() => setSuccessMessage('Copied to clipboard'))
                                .catch(() => setErrorMessage('Failed to copy to clipboard'))
                            }
                        >{url}
                        </button>
                    </div>
                ))}
            </div>}




        </div>
    );
}