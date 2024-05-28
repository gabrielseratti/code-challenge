const LandingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        // TODO 
        <main className="h-full overflow-auto"> 
            <div className="mx-auto max-w-screen-xl h-full">
                {children}
            </div>
        </main>
    );
}

export default LandingLayout;