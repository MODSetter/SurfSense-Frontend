export const Footer = () => {
    return (
        <footer className="mt-2 w-full md:flex overflow-y-hidden items-center justify-between gap-4 px-8 py-8 text-sm text-zinc-500 overflow-hidden text-center">
            <p>© 2024 SurfSense.net</p>
            <div className="flex gap-5 justify-around my-2">
                <a className="group/mail flex items-center" target="_blank" href="mailto:vermarohanfinal@gmail.com">Contact<svg className="group-hover/mail:opacity-100 opacity-0 transition hidden md:block" width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="0.792" stroke-linecap="round" strokeLinejoin="round"></path> </g></svg></a><a className="group/git flex items-center" target="_blank" href="https://github.com/MODSetter/SurfSense">Github<svg className="group-hover/git:opacity-100 opacity-0 transition hidden md:block" width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="0.792" stroke-linecap="round" strokeLinejoin="round"></path> </g></svg></a>
            </div>
        </footer>
    )
}
