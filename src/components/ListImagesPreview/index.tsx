import { FC, PropsWithChildren } from "react";
import { Delete } from "@styled-icons/material-outlined";

import Button from "../Button";

import * as S from "./styles";

export type ListFilesBlob = {
  id: string;
  src: string;
  file?: File;
  base_url?: string;
};

export type ListImagesPreviewProps = {
  files: ListFilesBlob[];
  onRemoveFile?: (fileId: string) => void;
};

const ListImagesPreview: FC<PropsWithChildren<ListImagesPreviewProps>> = ({
  files,
  onRemoveFile,
}) => {
  const handleDeleteFile = (fileId: string) =>
    onRemoveFile && onRemoveFile(fileId);

  const renderImages = () => {
    return files.map((file) => {
      return (
        <S.WrapperImage key={file.id}>
          <S.Image key={file.id} src={file.src} />
          {!!onRemoveFile && (
            <Button
              icon={<Delete />}
              size="small"
              onClick={() => handleDeleteFile(file.id)}
              type="button"
            />
          )}
        </S.WrapperImage>
      );
    });
  };

  return <S.Wrapper>{renderImages()}</S.Wrapper>;
};

export default ListImagesPreview;
