export default function SuccessDisplay({ message }: { message: string }) {

    return (
        <div className=" border border-green-800 bg-green-100 py-4 rounded-xl text-center w-full text-green-600">
            {message}
        </div>
    )
}