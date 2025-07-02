"use client";
import { Button } from "@/components/ui/button";
import {
	CommandEmpty,
	CommandInput,
	CommandList,
	CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CommandItem } from "cmdk";
import { ChevronsUpDownIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
	options: Array<{
		id: string;
		value: string;
		children: React.ReactNode;
	}>;
	onSelect: (value: string) => void;
	onSearch?: (value: string) => void;
	value: string;
	placeholder?: string;
	isSearchable?: boolean;
	className?: string;
}
export default function CommandSelect({
	onSelect,
	onSearch,
	value,
	placeholder = "Select an option",
	isSearchable,
	className,
	options,
}: Props) {
	const [open, setOpen] = useState(false);

	const selectedOption = options.find((option) => option.value === value);

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				type="button"
				variant="outline"
				className={cn(
					"h-9 justify-between font-normal px-2",
					!selectedOption && "text-muted-foreground",
					className
				)}
			>
				<div>{selectedOption?.children ?? placeholder}</div>
				<ChevronsUpDownIcon />
			</Button>

			<CommandResponsiveDialog
				open={open}
				onOpenChange={setOpen}
				shouldFilter={!onSearch}
			>
				<CommandInput placeholder="Search..." onValueChange={onSearch} />
				<CommandList>
					<CommandEmpty>
						<span className="text-muted-foreground text-sm">
							No results found
						</span>
					</CommandEmpty>
					{options.map((option) => (
						<CommandItem
							key={option.id}
							onSelect={() => {
								onSelect(option.value);
								setOpen(false);
							}}
						>
							{option.children}
						</CommandItem>
					))}
				</CommandList>
			</CommandResponsiveDialog>
		</>
	);
}
