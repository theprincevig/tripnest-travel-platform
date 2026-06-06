import { languages } from "../../configs/language.config.js";

export default function LanguageSelector({
    user,
    data,
    onChange,
    error
}) {
    const Host = user?.role === "host";

    return (
        <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {languages.map((language) => (
                    <label
                        key={language}
                        className={`
                            flex items-center gap-2 px-3 py-2 rounded-lg
                            ${Host ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                        `}
                    >
                        <input
                            type="checkbox"
                            checked={
                                data.hostProfile.languages.includes(language)
                            }
                            onChange={() => onChange(language)}
                            disabled={!Host}
                        />

                        <span>{language}</span>
                    </label>
                ))}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}