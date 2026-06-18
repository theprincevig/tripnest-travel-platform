export default function AuthHeader({ heading, tagline }) {
    return (
        <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-2xl sm:text-4xl font-bold font-[Archivo] text-primary">{heading}</h1>
            <p className="text-xs sm:text-sm font-[Mulish] font-medium opacity-80">{tagline}</p>
        </div>
    );
}