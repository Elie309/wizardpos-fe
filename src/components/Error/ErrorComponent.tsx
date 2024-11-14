export default function ErrorDisplay({text}: { text: string | null }) {
    return (
        <div className="w-full h-full flex justify-center items-center ">
            <div className="text-red-600 text-2xl">{text ?? "An Error occurred"}</div>
        </div>
    )

}