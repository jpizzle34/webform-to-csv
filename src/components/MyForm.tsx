import { zodResolver } from "@hookform/resolvers/zod";
import Papa from "papaparse";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Button } from "./ui/button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Define a Zod schema for form validation
const formSchema = z.object({
	input1: z.string().min(1, { message: "Input 1 is required" }),
	input2: z.string().min(1, { message: "Input 2 is required" }),
	input3: z.string().min(1, { message: "Input 3 is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

function DownloadCSVForm() {
	// Initialize react-hook-form with Zod schema validation
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (data: FormSchema) => {
		// Convert object to CSV using PapaParse
		const csvData = Papa.unparse([data]);

		// Create a Blob and URL for download
		const blob = new Blob([csvData], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);

		// Create a temporary anchor element and click it to download
		const link = document.createElement("a");
		link.href = url;
		link.download = "data.csv";
		link.click();

		// Clean up the URL object and reset the form
		window.URL.revokeObjectURL(url);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 p-4 border rounded-lg shadow-md max-w-md mx-auto"
		>
			<div>
				<Label htmlFor="input1">Input 1</Label>
				<Input id="input1" type="text" {...register("input1")} />
				{errors.input1 && (
					<p className="text-red-500">
						{errors.input1.message?.toString()}
					</p>
				)}
			</div>
			<div>
				<Label htmlFor="input2">Input 2</Label>
				<Input id="input2" type="text" {...register("input2")} />
				{errors.input2 && (
					<p className="text-red-500">
						{errors.input2.message?.toString()}
					</p>
				)}
			</div>
			<div>
				<Label htmlFor="input3">Input 3</Label>
				<Input id="input3" type="text" {...register("input3")} />
				{errors.input3 && (
					<p className="text-red-500">
						{errors.input3.message?.toString()}
					</p>
				)}
			</div>
			<Button type="submit">Download CSV</Button>
		</form>
	);
}

export default DownloadCSVForm;
