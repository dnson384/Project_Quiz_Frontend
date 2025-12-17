import { NewPracticeTest, PracticeTest } from "@/domain/entities/PracticeTest";
import axios from "axios";

const base_url = "/api/practice-test";

export async function getUserPracticeTest(): Promise<PracticeTest[]> {
  const response = await axios.get(`${base_url}/user`);
  return response.data;
}

export async function getRandomPracticeTest() {
  const response = await axios.get(`${base_url}/random`);
  return response.data;
}

export async function getPracticeTestDetail(practiceTestId: string) {
  const response = await axios.get(`${base_url}/detail`, {
    params: {
      practice_test_id: practiceTestId,
    },
  });
  return response.data;
}

export async function getPracticeTestRandomDetail(practiceTestId: string) {
  const response = await axios.get(`${base_url}/random-question`, {
    params: {
      practice_test_id: practiceTestId,
    },
  });
  return response.data;
}

export async function createNewPracticeTest(newPracticeTest: NewPracticeTest) {
  return await axios.post(`${base_url}/create`, newPracticeTest);
}
