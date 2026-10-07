#!/usr/bin/env bash
# Vercel "Ignored Build Step": exit 0 = derlemeyi ATLA, exit 1 = derle.
# Amaç: Vercel derleme dakikalarını ve deployment depolamasını boşa harcamamak.
# 1) Yalnızca production dalı (main) derlenir; v2 vb. dallar için önizleme deployment'ı üretilmez.
if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "main dışı dal ($VERCEL_GIT_COMMIT_REF): derleme atlandı"
  exit 0
fi
# 2) Yalnızca doküman / test / plan dosyaları değiştiyse derleme atlanır.
git diff --quiet HEAD^ HEAD -- . ':(exclude)docs' ':(exclude)*.md' ':(exclude)tests' ':(exclude).claude' 2>/dev/null
case $? in
  0) echo "Yalnızca doküman/test değişti: derleme atlandı"; exit 0 ;;
  1) echo "Site kodu veya verisi değişti: derleniyor"; exit 1 ;;
  *) echo "Fark hesaplanamadı: güvenli tarafta kalıp derleniyor"; exit 1 ;;
esac
