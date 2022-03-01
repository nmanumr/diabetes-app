import json
from django.conf import settings
from rest_framework.parsers import JSONParser, ParseError, MultiPartParser
from typing import Any

from diabetes.utils.strings import camel_to_underscore


def to_snake_case(data: Any) -> Any:
    if isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            new_key = camel_to_underscore(key)
            new_dict[new_key] = to_snake_case(value)
        return new_dict

    if isinstance(data, (list, tuple)):
        for i in range(len(data)):
            data[i] = to_snake_case(data[i])
        return data

    return data


class CamelCaseJSONParser(JSONParser):
    def parse(self, stream, media_type=None, parser_context=None):
        parser_context = parser_context or {}
        encoding = parser_context.get('encoding', settings.DEFAULT_CHARSET)

        try:
            data = stream.read().decode(encoding)
            return to_snake_case(json.loads(data))
        except ValueError as exc:
            raise ParseError(f'JSON parse error: {str(exc)}')


class MultiPartParserEx(MultiPartParser):
    def parse(self, *args, **kwargs):
        data_and_files = super().parse(*args, **kwargs)
        data_and_files.data = {
            camel_to_underscore(k): v
            for k, v in data_and_files.data.items()
        }
        data_and_files.files = {
            camel_to_underscore(k): v
            for k, v in data_and_files.files.items()
        }
        return data_and_files
