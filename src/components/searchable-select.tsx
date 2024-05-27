import React, {useRef, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {HiChevronUpDown} from "react-icons/hi2";
import {useComponentVisible} from "@/hooks";
import {cn} from "@/lib";

export type SelectItemProps = {
    key?: number | string;
    value?: string;
};

type SelectProps = {
    isLoading?: boolean;
    data?: SelectItemProps[];
    selectedItem?: SelectItemProps;
    className?: React.ReactNode;
    defaultPlaceholder?: string;
    usageType?: "FOR_ADD_CANDIDATE" | "COMMON";
    onSelected?: (data: SelectItemProps) => void;
    setSearchValue?: (keyword: string) => void;
};

const SearchableSelect = ({
                              isLoading = false, data, className,
                              defaultPlaceholder,
                              usageType = "FOR_ADD_CANDIDATE",
                              selectedItem,
                              onSelected,
                              setSearchValue,
                          }: SelectProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {isComponentVisible, setIsComponentVisible, ref} =
        useComponentVisible();

    const [searchValue, setLocalSearchValue] = useState(selectedItem?.value || "")


    const onValueSelect = (selectedItem: SelectItemProps) => {
        onSelected?.(selectedItem);
        setIsComponentVisible(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearchValue(value);
        setSearchValue?.(value);
    };

    return (
        <div className="flex justify-center items-center">
            <div ref={ref} className={cn("flex flex-col gap-2 relative", className)}>
                <div
                    className="flex justify-between items-center bg-white py-2 px-3 z-50 rounded-sm border border-black/20 cursor-pointer "
                    onClick={() => setIsComponentVisible(!isComponentVisible)}
                >
                    <span className={`text-sm ${selectedItem?.key === undefined && "text-muted-foreground"}`}>
                      {selectedItem?.value !== undefined ? selectedItem.value : defaultPlaceholder}
                    </span>
                    <HiChevronUpDown/>
                </div>

                {isComponentVisible && (
                    <div
                        className={cn(
                            "flex flex-col shadow bg-white border z-50 rounded-sm border-black/20 text-sm absolute top-11",
                            className
                        )}
                    >
                        <div
                            className="flex items-center bg-white  mx-3 gap-1 border-b border-b-gray-400 border-opacity-50 pb-[2px]">
                            <CiSearch className="text-xl text-gray-600 mt-[5px]"/>

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search..."
                                className="py-1 bg-transparent   w-full outline-none mt-1"
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <ul className="flex flex-col overflow-y-auto max-h-[280px] scrollbar-thin scrollbar-webkit">
                            {isLoading ? (
                                <div className="flex justify-center py-2">
                                    <AiOutlineLoading3Quarters className="text-xl text-primary animate-spin"/>
                                </div>
                            ) : data?.length === 0 ? (
                                usageType === "FOR_ADD_CANDIDATE" ? (
                                    <div className="px-3 py-2 flex flex-col items-center gap-2">
                                        <h1>No candidate found!</h1>
                                        <span className="text-blue-600 cursor-pointer">
                                            + Add candidate
                                        </span>
                                    </div>
                                ) : (
                                    <h1 className="px-3 text-center py-2 ">No data found</h1>
                                )
                            ) : (
                                data?.map((item) => (
                                    <li
                                        key={item.key}
                                        className="px-3 cursor-pointer py-[5px] hover:bg-gray-100"
                                        onClick={() => onValueSelect(item)}
                                    >
                                        {item.value}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchableSelect;
