def test_create_task(client):
    # First create a project and get it's id
    project_resp = client.post("/projects/", json={
        "title": "Task Project",
        "deadline": "2025-12-31T23:59:59"
    })
    project_id = project_resp.json()["id"]

    # Now create a task
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": "2025-11-30T12:00:00",
        "completed": False,
        "project_id": project_id
    })
    assert task_resp.status_code == 200
    task = task_resp.json()
    assert task["title"] == "Test Task"
    assert task["project_id"] == project_id

def test_create_task_deadline_after_project_deadline(client):
    # First create a project and get it's id
    project_resp = client.post("/projects/", json={
        "title": "Task Project",
        "deadline": "2025-10-31T23:59:59"
    })
    project_id = project_resp.json()["id"]
    
    # Now try to create a task
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": "2025-11-30T12:00:00",
        "completed": False,
        "project_id": project_id
    })
    assert task_resp.status_code == 400
    

def test_get_tasks(client):
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
