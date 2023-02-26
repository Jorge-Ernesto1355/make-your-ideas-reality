/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { FiEdit } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const [images, setImages] = React.useState<any>(null);
  const [info, setInfo] = useState(true);
  const maxNumber = 5;

  const variants = {
    open: { opacity: 1, y: 15 },
    closed: { opacity: 0, y: 30 },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (imageList: any, addUpdatIndex: any) => {
    setImages(imageList);
  };

  const convertKBoM = (bytes: number | undefined) => {
    const measure = bytes ? bytes / 1024 : undefined;
    if (measure) {
      if (Math.floor(measure) >= 1024) {
        const Mb = measure / 1024;
        return <p>{`${Math.floor(Mb)}MB`}</p>;
      }
      return <p>{`${Math.floor(measure)}KB`}</p>;
    }

    return undefined;
  };

  const fileName = (text: string | undefined) => {
    if (text) {
      const extension = text.replace(/(.+)\.[^.]+$/, "$1");
      return <p>{extension}</p>;
    }

    return "";
  };

  const ExtensionFile = (text: string | undefined) => {
    if (text) {
      const mime_type = "image/jpeg";
      const matches: RegExpMatchArray | null = mime_type.match(/image\/(.+)/);
      const extension: string | undefined = matches?.[1];

      return <p>{extension}</p>;
    }

    return undefined;
  };

  return (
    <div className="grid h-screen w-screen place-content-center rounded-sm ">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey={"data_url"}
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (
          <div className="h-[550px] w-[500px] bg-white p-2 shadow-lg">
            <div className="flex w-full items-center justify-between p-3">
              <h3 className="font-medium text-black">Agrega Nuevas Imagenes</h3>
              <p>
                <RxCross2 size={"25px"} />
              </p>
            </div>

            <div
              className={`relative my-5 flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#b8b8b8] ${
                isDragging ? "bg-red" : ""
              }`}
              {...dragProps}
            >
              <motion.div
                className={`absolute top-5 right-3 ${!info ? "hidden" : ""}`}
                animate={info ? "open" : "closed"}
                variants={variants}
              >
                <div className="z-10 w-96 rounded-md border bg-white p-1 py-2 font-normal text-black shadow-lg">
                  <p className="border-b-2">
                    Asegurate que las imagenes tomen bien la perspectiva del
                    dibujo
                  </p>

                  <p>Asegurate que las imagenes no sobre pasen los 8 megas</p>
                </div>
              </motion.div>
              <AiOutlineInfoCircle
                className="absolute top-2 right-3 cursor-pointer"
                size={"20px"}
                color={"#404040"}
                onClick={() => setInfo((info) => !info)}
              />

              <AiOutlineCloudUpload size={"2.5em"} />
              <p className="font-medium text-black">
                Arrastra y Tira o{" "}
                <span
                  onClick={onImageUpload}
                  className="cursor-pointer text-blue-400"
                >
                  Escoje un Archivo
                </span>{" "}
                para subirlo
              </p>
            </div>
            <div className="-my-2 flex w-full items-center justify-end space-x-2">
              <p className={`${images?.length >= 5 ? "text-red-500" : ""}`}>
                {imageList.length}/5{" "}
              </p>

              <motion.button
                className="rounded-md border-2 px-1 shadow-md"
                onClick={() => onImageRemoveAll()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
              >
                Borrar imagenes
              </motion.button>
            </div>

            <ul className=" my-3 flex h-60 w-full  scroll-m-12 flex-col overflow-auto p-1">
              {imageList?.map((image, index) => (
                <>
                  <AnimatePresence>
                    <motion.li
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ease: "easeOut", duration: 0.13 }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.13 },
                      }}
                      key={`key-${index}`}
                      className="my-2 flex w-full justify-between rounded-md border-2 bg-slate-100 p-2 shadow-md"
                    >
                      <div className="flex space-x-2">
                        <img
                          className="h-14 w-14 object-cover"
                          src={image.data_url}
                          alt="jrge"
                        />

                        <div className="flex flex-col items-start justify-center">
                          <p className="font-medium text-black">
                            {fileName(image?.file?.name)}
                          </p>
                          <div className="flex   space-x-2 text-sm font-medium text-slate-500">
                            <span className="ml-1">
                              {convertKBoM(image.file?.size)}
                            </span>
                            <span className="flex ">
                              Type:{" "}
                              <span className="ml-1">
                                {ExtensionFile(image.file?.type)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ">
                        <FiEdit
                          onClick={() => onImageUpdate(index)}
                          className={"cursor-pointer"}
                        />
                        <RxCross2
                          size={"20px"}
                          className={"cursor-pointer"}
                          onClick={() => onImageRemove(index)}
                        />
                      </div>
                    </motion.li>
                  </AnimatePresence>
                </>
              ))}
            </ul>
            <div className=" my-2 flex w-full justify-end space-x-2">
              <button className="rounded-md border-2 p-1 font-medium shadow-md">
                cancelar
              </button>
              <button className=" rounded-md bg-blue-400 p-1 font-medium text-white shadow-md ">
                importar
              </button>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
export default Index;
