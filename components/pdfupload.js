import { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import toast from 'react-hot-toast';
// import classNames from 'classnames';
// import { ArrowUpIcon } from '@heroicons/react/outline';

const ImageUpload = ({
    label = 'Select',
    accept = '.pdf',
    sizeLimit = 10 * 1024 * 1024, // 10MB
    onChangePicture = () => null,
}) => {
    const [pictureError, setPictureError] = useState(null);
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const fileName = file?.name?.split('.')?.[0] ?? 'New file';

        reader.addEventListener(
            'load',async function () {
                try {
                    if (typeof onChangePicture === 'function') {
                        onChangePicture(reader.result);
                    }
                } catch (err) {
                    toast.error('Unable to update image');
                } 
            },
            false
        );
        if (file) {
            if (file.size <= sizeLimit) {
                setPictureError('');
                reader.readAsDataURL(file);
            } else {
                setPictureError('File size is exceeding 10MB.');
            }
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-gray-600">{label}</label>
            <div className='w-full  h-10 flex items-center justify-start rounded-md pl-3 pr-3 bg-qp-orange cursor-pointer'>
                <input className='custom-file-input' id="file_input" type="file" accept={accept}
                    onChange={(e) => {
                        handleUpload(e); // 👈 this will trigger when user selects the file.
                    }}hidden></input>
                    <label className='w-full  h-10 flex items-center justify-start rounded-md  bg-qp-orange cursor-pointer'  htmlFor="file_input">Choose file</label>
            </div>

            {pictureError ? (
                <span className="text-red-600 text-sm">{pictureError}</span>
            ) : null}
        </div>
    );
};

ImageUpload.propTypes = {
    label: PropTypes.string,
    accept: PropTypes.string,
    sizeLimit: PropTypes.number,
    onChangePicture: PropTypes.func,
};

export default ImageUpload;