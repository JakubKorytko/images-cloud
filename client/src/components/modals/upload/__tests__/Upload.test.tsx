import { fireEvent, render } from "@testing-library/react";

import Upload from "../Upload";

let uploaded: boolean = false;

const empty = (): true => {
    return true;
}

const upload = (): void => {
    uploaded = true;
}

test("Uploading file works properly", () => {
    const { getByTestId, getByText } = render(<Upload show={true} toggle={empty} imageUpload={upload}/>)

    fireEvent.change(getByTestId("upload"))
    fireEvent.click(getByText("Upload file"));
    
    expect(uploaded).toBe(true);
})