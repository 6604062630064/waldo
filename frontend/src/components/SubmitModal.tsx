import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from "@nextui-org/react";
import { FormEvent, FormEventHandler } from "react";
export default function SubmitModal({
	isOpen,
	onClose,
	onSubmit,
	totalTime,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (e: FormEvent) => void;
	totalTime: number;
}) {
	return (
		<>
			<Modal isOpen={isOpen} isDismissable={false} hideCloseButton={true}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">Result</ModalHeader>
							<form action="post" onSubmit={onSubmit}>
								<ModalBody>
									<div className="flex gap-3">
										<h3>Time spent:</h3>
										<p>{totalTime / 1000} seconds</p>
									</div>
									<Input
										type="text"
										label="name"
										id="name"
										name="name"
										variant="bordered"
										placeholder="Enter your name"
										onClear={() => console.log("input cleared")}
										className="max-w-xs"
										isRequired={true}
										fullWidth={false}
										minLength={4}
										maxLength={10}
									></Input>
								</ModalBody>
								<ModalFooter>
									<Button color="primary" type="submit">
										Submit
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
