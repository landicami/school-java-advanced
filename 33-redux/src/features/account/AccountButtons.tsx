import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useAppDispatch } from "../../app/hooks";
import { deposit, depositByAmont, withdraw, withdrawByAmont } from "./accountSlice";

const AccountButtons = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<ButtonGroup>
				<Button variant="warning" onClick={() => dispatch(withdrawByAmont(5))}>
					-$5
				</Button>
				<Button variant="warning" onClick={() => dispatch(withdrawByAmont(1))}>
					-$1
				</Button>
			</ButtonGroup>

			<ButtonGroup>
				<Button variant="success" onClick={() => dispatch(depositByAmont(1))}>
					+$1
				</Button>
				<Button variant="success" onClick={() => dispatch(depositByAmont(5))}>
					+$5
				</Button>
			</ButtonGroup>
		</>
	);
};

export default AccountButtons;
