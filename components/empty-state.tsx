import Image from "next/image";

interface Props {
	title: string;
	description: string;
	image?: string;
}

export default function EmptyState({
	title,
	description,
	image = "/empty.svg",
}: Props) {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="flex flex-col items-center justify-center gap-y-6 w-full">
				<Image src={image} alt="empty" width={240} height={240} />
				<div className="flex flex-col gap-y-6 mx-auto max-w-md text-center">
					<h6 className="text-lg font-medium ">{title}</h6>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</div>
	);
}
