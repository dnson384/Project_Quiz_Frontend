import {
  NewPracticeTest,
  PracticeTest,
  UpdatePracticeTest,
} from "@/domain/entities/PracticeTest";
import axios from "axios";

const base_url = "/api/practice-test";

interface DeleteOptionData {
  questionId: string;
  optionId: string;
}

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

export async function updatePracticetestService(
  practiceTestId: string,
  updatePracticeTest: UpdatePracticeTest
) {
  return await axios.put(`${base_url}/update`, {
    practiceTestId: practiceTestId,
    updatePracticeTest: updatePracticeTest,
  });
}

export async function deleteOptionsService(
  practiceTestId: string,
  deleteOptions: DeleteOptionData[]
) {
  return await axios.delete(`${base_url}/delete-options`, {
    data: {
      practiceTestId: practiceTestId,
      deletedOptions: deleteOptions,
    },
  });
}

export async function deleteQuestionsService(practiceTestId: string, deleteQuestions: string[]) {
  return await axios.delete(`${base_url}/delete-questions`, {
    data: {
      practiceTestId: practiceTestId,
      deleteQuestions: deleteQuestions,
    },
  });
}
