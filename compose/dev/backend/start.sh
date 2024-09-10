#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

alembic upgrade head
uvicorn app:app --reload --host 0.0.0.0 --port 8000 --log-level debug