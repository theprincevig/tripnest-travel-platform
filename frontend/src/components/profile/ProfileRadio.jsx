export default function ProfileRadio({ label, radioFor, name, value, onChange}) {
    return (
        <div className="relative flex items-center gap-2">
            <input 
                type="radio"
                id={radioFor}
                name={name}
                value={radioFor}
                checked={value === radioFor}
                onChange={onChange}
                className="w-full"
            />
            <label htmlFor={radioFor}>
                {label}
            </label>
        </div>
    );
}