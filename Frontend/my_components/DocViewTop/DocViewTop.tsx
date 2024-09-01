import React, { useEffect, useState, useRef } from "react";
import SectionDisplay from "../Individual/sectionDisplay/sectionDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setCustomized,
  setFilterStateData,
  setOptions,
  setProductData,
  setSearchString,
  setUtilityStateData,
} from "@/RTK/features/cart";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import axios from "@/utils/axios";
import { BACKEND_URI, RENDER_BACKEND_URI } from "@/CONSTANTS";
import { ToastErrors, ToastInfo } from "@/Helpers/toastError";
import { CircularProgress } from "@nextui-org/react";
import usePreventScroll from '@/Helpers/stopScrollingInput';

interface CustomField {
  key: string;
  value: string;
}

interface Column {
  listId: string;
  colId: string;
  name: string;
  type: "string" | "number";
  utilityVal: number;
  range: Array<{
    value: string|number;
    utility: number;
  }>;
}

interface StateColumn {
  key: string;
  label: string;
  listId: string;
  type: "string" | "number";
  utilityVal: number;
  range: Array<{
    value: string|number;
    utility: number;
  }>;
}

const cols: Column[] = [
  {
    listId: "watch",
    colId: "price",
    name: "Price",
    type: "number",
    range: [{value: 400, utility: 0}, {value: 5000, utility: 0}],
    utilityVal: 0,
  },
];

function DocViewTop() {
  const inputRef = useRef<HTMLInputElement>(null);
  usePreventScroll(inputRef);
  const stateCols = useSelector((state: any) => state.cart.columns);
  const [Cols, setCols] = useState<Column[]>(cols);
  const listId = useSelector((state: any) => state.sidebar.currentList);
  const dispatcher = useDispatch();
  const selectedTab = useSelector((state: any) => state.cart.customized);
  const searchValue = useSelector((state: any) => state.cart.searchString);
  const [productLink, setProductLink] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [utiltyModalIsOpen, setUtilityModalIsOpen] = useState(false);
  const [filterData, setFilterData] = useState<{ [key: string]: any }>({});
  const [utilityData, setUtilityData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let newCols: Column[] = [];
    stateCols.forEach((col:StateColumn) => {
      if(col.key !== "images"){
        const newCol = {
          listId: col.listId,
          colId: col.key,
          name: col.label,
          type: col.type,
          range: col.range,
          utilityVal: col.utilityVal,
        }
        newCols.push(newCol);
      }
    });
    setCols(newCols);
  }, [stateCols]);

  const handleAddField = () => {
    const newField = { key, value };

    setCustomFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.key === key);

      if (fieldIndex !== -1) {
        const updatedFields = [...prevFields];
        updatedFields[fieldIndex] = newField;
        return updatedFields.sort((a, b) => a.key.localeCompare(b.key));
      } else {
        const updatedFields = [newField, ...prevFields];
        return updatedFields.sort((a, b) => a.key.localeCompare(b.key));
      }
    });

    setKey("");
    setValue("");
    keyInputRef.current?.focus();
  };

  const handleRemoveField = (indexToRemove: number) => {
    setCustomFields((prevFields) => {
      const updatedFields = prevFields.filter(
        (_, index) => index !== indexToRemove,
      );
      return updatedFields;
    });
  };

  const getModalHeader = () => {
    if (addProductModalIsOpen) {
      return "Add Doctor By Code";
    } else if (filterModalIsOpen) {
      return "Filter products";
    } else if (utiltyModalIsOpen) {
      return "Set Utility";
    }
  };

  const handleFilterChange = (colId: string, listId: string, value: any) => {
    console.log("value", value);
    if(value.from || value.to){
      setFilterData((prevData) => ({
        ...prevData,
        [listId + "_" + colId]: value,
      }));
    }
    else{
      setFilterData((prevData) => ({
        ...prevData,
        [listId + "_" + colId]: [...value],
      }));
    }
    console.log(filterData);
  };

  const handleUtilityChange = (colId: string, listId: string, value: any) => {
    setUtilityData((prevData) => ({
      ...prevData,
      [listId + "_" + colId]: value,
    }));
  };


  return (
    <div className="width-[100%] my-4 flex h-[7%] cursor-pointer items-center justify-between font-medium">
      <div className="flex gap-4">
        <SectionDisplay />
        <div className="flex items-center rounded-[10px] bg-color1">
          {/* <div
            className={
              selectedTab
                ? "m-[2px] mr-0 w-[7rem] rounded-[10px] p-2 pr-2 text-center text-sm text-textColorDark"
                : "m-1 mr-0 w-[7rem] rounded-[10px] bg-secondaryColor p-2 pr-2 text-center text-sm text-primaryColor"
            }
            onClick={() => {
              dispatcher(setCustomized(0));
            }}
          >
            Standard
          </div>
          <div
            className={
              !selectedTab
                ? "m-[2px] ml-0 w-[7rem] rounded-[10px] p-2 pr-2 text-center text-sm text-textColorDark"
                : "m-1 ml-0 w-[7rem] rounded-[10px] bg-secondaryColor p-2 pr-2 text-center text-sm text-primaryColor"
            }
            onClick={() => {
              dispatcher(setCustomized(1));
            }}
          >
            Customized
          </div> */}
        </div>
      </div>
      <div className="flex h-[7vh] items-end gap-2">
        <Input
          ref={inputRef}
          isClearable
          radius="sm"
          placeholder="Search Patient"
          startContent={
            <div>
              <img src="../icons/search.png" className="w-[15px]" alt="logo" />
            </div>
          }
          value={searchValue}
          onChange={(e) => dispatcher(setSearchString(e.target.value))}
        />
        <div className="flex items-center gap-2">
          {selectedTab ? (
            <div
              className="flex items-center justify-center rounded-md bg-secondaryColor px-4 py-[0.4rem] text-primaryColor"
              onClick={() => {
                onOpen();
                setUtilityModalIsOpen(true);
                setAddProductModalIsOpen(false);
                setFilterModalIsOpen(false);
              }}
            >
              Utility
            </div>
          ) : (
            <></>
          )}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondaryColor"
            onClick={() => {
              onOpen();
              setAddProductModalIsOpen(true);
              setFilterModalIsOpen(false);
              setUtilityModalIsOpen(false);
            }}
          >
            <img src="../icons/additionH.png" className="w-[15px]" alt="logo" />
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1 font-medium">
                  {getModalHeader()}
                </ModalHeader>
                <ModalBody>
                  {(loading && (
                    <div className="flex h-full w-full items-center justify-center">
                      <CircularProgress aria-label="Loading..." color="danger" />
                    </div>
                  )) || (
                    <>
                      {addProductModalIsOpen && (
                        <>
                          <Input
                            ref={inputRef}
                            isClearable
                            radius="sm"
                            placeholder="Enter Unique Code"
                            startContent={
                              <div>
                                <img
                                  src="../icons/web.png"
                                  className="w-[15px]"
                                  alt="logo"
                                />
                              </div>
                            }
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)}
                          />
                         
                        </>
                      )}
                      
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {addProductModalIsOpen && (
                    <>
                      <Button
                        className="mx-auto"
                        color="danger"
                        variant="flat"
                        onPress={async () => {
                          try {
                            setLoading(true);
                            const addProductRes = await axios.post(
                              RENDER_BACKEND_URI + "/list/addProductToList",
                              {
                                listId: listId,
                                productLink: productLink,
                                customFields: customFields,
                              },
                            );
                            setCustomFields([]);
                            setKey("");
                            setValue("");
                            setProductLink("");
                            ToastInfo("Doctor added succussfully");
                            const loadCart = async () => {
                              const cartRes = await axios.post(`${BACKEND_URI}/list/getListData`, {
                                listId: listId,
                              });
                              if (cartRes.data.statusCode !== 200) {
                                return;
                              }
                              dispatcher(setProductData(cartRes.data.data.products));
                              dispatcher(setColumns(cartRes.data.data.columns));
                              dispatcher(setOptions(cartRes.data.data.options));
                            };
                            if(listId && listId!=""){
                              loadCart();
                            }
                            onClose();
                          } catch (e) {
                            ToastErrors("Add Doctor Failed");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Add Doctor
                      </Button>
                    </>
                  )}
                  {filterModalIsOpen && (
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          dispatcher(setFilterStateData(filterData));
                          onClose();
                        }}
                      >
                        Apply filter
                      </Button>
                    </>
                  )}
                  {utiltyModalIsOpen && (
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          // TODO: Utility application logic should be added here
                          console.log(utilityData);
                          dispatcher(setUtilityStateData(utilityData));
                          onClose();
                        }}
                      >
                        Apply utility
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default DocViewTop;
