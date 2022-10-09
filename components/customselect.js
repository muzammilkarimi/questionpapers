import { useField } from "formik";

const CustomSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const error = meta?.touched && meta?.error;

    return (
        <>
            <div className=" flex flex-col">
                <label>{label}</label>
                <select
                    {...field}
                    {...props}
                    className="h-10 min-w-28 w-full rounded-md pl-3 pr-3 outline-none"
                />
                {error ? (
                    <p name="email" className="text-red-600 text-sm first-letter:uppercase">
                        {error}
                    </p>
                ) : null}
            </div>
        </>
    );
};
export default CustomSelect;