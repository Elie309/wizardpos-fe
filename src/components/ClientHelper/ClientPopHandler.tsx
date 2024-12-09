
import { useState } from "react";
import Client from "../../types/Client";
import ClientForm from "./ClientFormHandler";
import SuccessDisplay from "../Utils/SuccessComponent";
import ClientSearchHandler from "./ClientSearchHandler";

type IProps = {
    onClientSelect: (client: Client) => void;
}


export default function ClientPopHandler(props: IProps) {


    const [addedClient, setAddedClient] = useState<Client | null>(null);

    const [isSearching, setIsSearching] = useState(true);





    if (isSearching) {


        return <div>
            <ClientSearchHandler
                onClientSelect={(client) => {
                    props.onClientSelect(client);
                }}
                onAddClientButtonClick={() => {
                    setIsSearching(false);
                }}
            />

            {addedClient &&
                <SuccessDisplay message={`Client added successfully, ${addedClient.getFullName()} - ${addedClient.client_phone_number} `} />
            }

        </div>
    }

    return <ClientForm
        onCancelButtonClick={() => setIsSearching(true)}
        onSuccess={(client) => {
            setAddedClient(client);
            setIsSearching(true);
        }}
    />


}