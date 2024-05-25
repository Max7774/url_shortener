import Button from "@UI/Button/Button";
import UploadButton from "@UI/Button/UploadButton";
import Heading from "@UI/Heading/Heading";
import FieldArea from "@UI/Input/FieldArea";
import Paper2 from "@UI/Paper/Paper_V2/Paper2";
import Switch from "@UI/Switch/Switch";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { convertLinks } from "utils/convertLinksToArray";
import Campaigns from "./Campaigns";
import { downloadFile } from "./utils/downloadFile";

const Main = () => {
  const [useFile, setUseFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const urls = convertLinks(String(formData.get("urls")));
    setIsLoading(true);
    if (!useFile) {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/create`,
        urls
      );
      downloadFile(response.data);
      setIsLoading(false);
    } else {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      downloadFile(response.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading className="m-10 text-center">URL Shortener</Heading>
      <Paper2>
        <form onSubmit={submit}>
          {!useFile && (
            <FieldArea
              name="urls"
              placeholder="Urls"
              disabled={useFile}
              rows={4}
            />
          )}
          <Switch isChecked={useFile} setCheck={() => setUseFile(!useFile)}>
            Use File
          </Switch>
          {useFile && <UploadButton name="file" text="Upload CSV" />}
          <Button isLoading={isLoading} type="submit" variant="orange">
            Create
          </Button>
        </form>
      </Paper2>
      <Campaigns isLoading={isLoading} />
    </>
  );
};

export default Main;
