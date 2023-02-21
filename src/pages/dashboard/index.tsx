/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { S3 } from "aws-sdk";
import axios from "axios";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { api } from "../../utils/api";

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [file, setFile] = useState<any>(null);

  const { mutateAsync } = api.aws.upload.useMutation();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!file) return;

    const result = await mutateAsync();
    if (result.status === 201) {
      try {
        await axios.put(result.url, file);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">enviar</button>
      </form>
    </div>
  );
};
export default Dashboard;
