interface BlurredBackgroundProps {
    imageUrl: string;
    children: React.ReactNode;
}

export default function BlurredBackground(Props: BlurredBackgroundProps ){
    return (
        <div
            className="relative w-full h-screen overflow-hidden"
            style={{ backgroundImage: `url(${Props.imageUrl})` }}
        >
            {/* Blurred and Darkened Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

            {/* Content Layer */}
            <div className="relative z-10 flex items-center justify-center h-full text-white overflow-auto">
                {Props.children}
            </div>
        </div>
    );
};
