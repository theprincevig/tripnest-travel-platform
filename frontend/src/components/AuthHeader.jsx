export default function AuthHeader({ heading, tagline }) {
    return (
        <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-3xl font-semibold font-[Ramabhadra] text-primary">{heading}</h1>
            <p className="text-xs font-[Poppins]">{tagline}</p>
        </div>
    );
}