import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate


class LLMService:
    def __init__(self):
        # Aqui assumimos que há uma variável de ambiente HF_TOKEN configurada.
        self.llm = ChatOpenAI(
            temperature=0.5,
            top_p=0.7,
            api_key=os.getenv("HF_TOKEN"),  # type: ignore
            base_url="https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1",
        )

    def summarize_text(self, text: str, lang: str = "português") -> str:
        prompt_template = PromptTemplate(
            input_variables=["text", "language"],
            template=(
                "Resuma o seguinte texto no idioma {lang}: \n\n"
                "{text}"
            )
        )

        prompt = prompt_template.format(text=text, lang=lang)

        response = self.llm.predict(prompt)
        return response
