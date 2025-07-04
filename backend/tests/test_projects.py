def test_create_project(client):
    response = client.post("/projects/", json={
        "title": "Test Project",
        "deadline": "2025-12-31T23:59:59"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Project"
    assert "id" in data


def test_get_projects(client):
    response = client.get("/projects/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
