import { render} from "@testing-library/react";

import Progress from "../Progress";

const empty = (): true => {
    return true;
}

test("Progress bar displays percentage correctly", () => {
    const { getByRole } = render(<Progress reset={empty} toggle={empty} show={true} percentage={50} />)
    
    expect(getByRole("progressbar").textContent).toBe("50%");
})

